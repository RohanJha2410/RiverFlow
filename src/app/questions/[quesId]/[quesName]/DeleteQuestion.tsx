"use client";

import { databases } from "@/models/client/config";
import { db, questionCollection } from "@/models/name";
import { useAuthStore } from "@/store/Auth";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteQuestion = ({ questionId, authorId }: { questionId: string; authorId: string }) => {
    const router = useRouter();
    const { user } = useAuthStore();

    const deleteQuestion = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if (!confirmDelete) return;
        
        try {
            console.log("Attempting to delete question:", { questionId, db, questionCollection });
            await databases.deleteDocument(db, questionCollection, questionId);
            console.log("Question deleted successfully");

            router.push("/questions");
        } catch (error: any) {
            console.error("Delete error:", error);
            window.alert(error?.message || "Something went wrong");
        }
    };

    return user?.$id === authorId ? (
        <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500 p-1 text-red-500 duration-200 hover:bg-red-500/10"
            onClick={deleteQuestion}
        >
            <IconTrash className="h-4 w-4" />
        </button>
    ) : null;
};

export default DeleteQuestion;
