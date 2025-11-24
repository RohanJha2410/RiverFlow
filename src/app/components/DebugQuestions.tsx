import { databases } from "@/models/server/config";
import { db, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";

const DebugQuestions = async () => {
    console.log("DEBUG - Starting database debug");
    console.log("DEBUG - Database:", db);
    console.log("DEBUG - Collection:", questionCollection);
    
    try {
        // Test 1: Simple query with no filters
        const allQuestions = await databases.listDocuments(db, questionCollection, [
            Query.limit(100) // Get up to 100 questions
        ]);
        
        console.log("DEBUG - All questions (no filters):", {
            total: allQuestions.total,
            documentsCount: allQuestions.documents.length,
            documents: allQuestions.documents.map(q => ({
                id: q.$id,
                title: q.title,
                authorId: q.authorId,
                permissions: q.$permissions,
                createdAt: q.$createdAt
            }))
        });
        
        // Test 2: Try with orderDesc
        const orderedQuestions = await databases.listDocuments(db, questionCollection, [
            Query.orderDesc("$createdAt"),
            Query.limit(10)
        ]);
        
        console.log("DEBUG - Ordered questions:", {
            total: orderedQuestions.total,
            documentsCount: orderedQuestions.documents.length
        });
        
        return (
            <div className="bg-red-900/20 p-4 rounded border border-red-500/30 text-white">
                <h3 className="font-bold mb-2">DEBUG INFO:</h3>
                <p>Total questions in database: {allQuestions.total}</p>
                <p>Documents returned: {allQuestions.documents.length}</p>
                {allQuestions.documents.length > 0 && (
                    <div className="mt-2">
                        <h4 className="font-semibold">Latest question:</h4>
                        <p>Title: {allQuestions.documents[0].title}</p>
                        <p>ID: {allQuestions.documents[0].$id}</p>
                        <p>Created: {allQuestions.documents[0].$createdAt}</p>
                    </div>
                )}
            </div>
        );
        
    } catch (error) {
        console.log("DEBUG - Error in database query:", error);
        return (
            <div className="bg-red-900/20 p-4 rounded border border-red-500/30 text-white">
                <h3 className="font-bold mb-2">DEBUG ERROR:</h3>
                <p>Failed to query database: {(error as Error).message}</p>
            </div>
        );
    }
};

export default DebugQuestions;