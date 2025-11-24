import { databases, storage } from "@/models/server/config";
import { db, questionAttachmentBucket, questionCollection } from "@/models/name";
import { NextRequest, NextResponse } from "next/server";
import { ID, Permission, Role } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const authorId = formData.get("authorId") as string;
        const tags = formData.get("tags") as string;
        const attachment = formData.get("attachment") as File | null;
        
        console.log("API - Creating question with data:", {
            title,
            content,
            authorId,
            tags: tags ? JSON.parse(tags) : [],
            hasAttachment: !!attachment
        });
        
        // Validate required fields
        if (!title?.trim()) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }
        
        if (!content?.trim()) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }
        
        if (!authorId) {
            return NextResponse.json({ error: "Author ID is required" }, { status: 400 });
        }
        
        // Upload attachment if provided
        let attachmentId = null;
        if (attachment && attachment.size > 0) {
            try {
                const storageResponse = await storage.createFile(
                    questionAttachmentBucket,
                    ID.unique(),
                    attachment
                );
                attachmentId = storageResponse.$id;
                console.log("API - Attachment uploaded:", attachmentId);
            } catch (storageError) {
                console.error("API - Error uploading attachment:", storageError);
                return NextResponse.json({ error: "Failed to upload attachment" }, { status: 500 });
            }
        }
        
        // Create question document with explicit permissions
        const questionData = {
            title: title.trim(),
            content: content.trim(),
            authorId: authorId,
            tags: tags ? JSON.parse(tags) : [],
            attachmentId: attachmentId,
        };
        
        console.log("API - Creating document with data:", questionData);
        
        const response = await databases.createDocument(
            db,
            questionCollection,
            ID.unique(),
            questionData,
            [
                Permission.read(Role.any()), // Anyone can read
                Permission.update(Role.user(authorId)), // Only author can update
                Permission.delete(Role.user(authorId)), // Only author can delete
            ]
        );
        
        console.log("API - Question created successfully:", {
            id: response.$id,
            title: response.title,
            permissions: response.$permissions
        });
        
        return NextResponse.json({
            success: true,
            question: {
                $id: response.$id,
                title: response.title,
                content: response.content,
                authorId: response.authorId,
                tags: response.tags,
                attachmentId: response.attachmentId,
                $createdAt: response.$createdAt,
                $updatedAt: response.$updatedAt
            }
        });
        
    } catch (error: any) {
        console.error("API - Error creating question:", error);
        return NextResponse.json({ 
            error: "Failed to create question", 
            details: error.message 
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const formData = await request.formData();
        
        const questionId = formData.get("questionId") as string;
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const authorId = formData.get("authorId") as string;
        const tags = formData.get("tags") as string;
        const attachment = formData.get("attachment") as File | null;
        const currentAttachmentId = formData.get("currentAttachmentId") as string | null;
        
        if (!questionId) {
            return NextResponse.json({ error: "Question ID is required" }, { status: 400 });
        }
        
        console.log("API - Updating question:", questionId);
        
        // Handle attachment update
        let attachmentId = currentAttachmentId;
        if (attachment && attachment.size > 0) {
            // Delete old attachment if exists
            if (currentAttachmentId) {
                try {
                    await storage.deleteFile(questionAttachmentBucket, currentAttachmentId);
                } catch (deleteError) {
                    console.warn("API - Could not delete old attachment:", deleteError);
                }
            }
            
            // Upload new attachment
            const storageResponse = await storage.createFile(
                questionAttachmentBucket,
                ID.unique(),
                attachment
            );
            attachmentId = storageResponse.$id;
        }
        
        const updateData = {
            title: title.trim(),
            content: content.trim(),
            tags: tags ? JSON.parse(tags) : [],
            attachmentId: attachmentId,
        };
        
        const response = await databases.updateDocument(
            db,
            questionCollection,
            questionId,
            updateData
        );
        
        console.log("API - Question updated successfully:", response.$id);
        
        return NextResponse.json({
            success: true,
            question: response
        });
        
    } catch (error: any) {
        console.error("API - Error updating question:", error);
        return NextResponse.json({ 
            error: "Failed to update question", 
            details: error.message 
        }, { status: 500 });
    }
}