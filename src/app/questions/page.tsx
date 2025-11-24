import { databases, users } from "@/models/server/config";
import { answerCollection, db, voteCollection, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";
import React from "react";
import Link from "next/link";
import ShimmerButton from "@/components/magicui/shimmer-button";
import QuestionCard from "@/components/QuestionCard";
import { UserPrefs } from "@/store/Auth";
import Pagination from "@/components/Pagination";
import Search from "./Search";

const Page = async ({
    searchParams,
}: {
    searchParams: { page?: string; tag?: string; search?: string };
}) => {
    searchParams.page ||= "1";

    const queries = [
        Query.orderDesc("$createdAt"),
        Query.offset((+searchParams.page - 1) * 25),
        Query.limit(25),
    ];

    if (searchParams.tag) queries.push(Query.equal("tags", searchParams.tag));
    
    // Add search query if provided (will be handled with error catching during database call)
    if (searchParams.search) {
        queries.push(
            Query.or([
                Query.search("title", searchParams.search),
                Query.search("content", searchParams.search),
            ])
        );
    }

    let questions;
    try {
        console.log("Trying to fetch questions with queries:", queries.map(q => JSON.stringify(q)));
        questions = await databases.listDocuments(db, questionCollection, queries);
        console.log("Questions fetched successfully:", questions);
    } catch (error) {
        console.log("Error fetching questions:", error);
        // If search fails (e.g., fulltext index missing), try without search queries
        const basicQueries = [
            Query.orderDesc("$createdAt"),
            Query.offset((+searchParams.page - 1) * 25),
            Query.limit(25),
        ];
        if (searchParams.tag) basicQueries.push(Query.equal("tags", searchParams.tag));
        
        // If there was a search term, try with contains instead of search
        if (searchParams.search) {
            try {
                basicQueries.push(
                    Query.or([
                        Query.contains("title", searchParams.search),
                        Query.contains("content", searchParams.search),
                    ])
                );
                console.log("Trying contains-based search queries:", basicQueries.map(q => JSON.stringify(q)));
                questions = await databases.listDocuments(db, questionCollection, basicQueries);
                console.log("Questions fetched with contains search:", questions);
            } catch (containsError) {
                console.log("Contains search also failed, falling back to basic queries:", containsError);
                const fallbackQueries = [
                    Query.orderDesc("$createdAt"),
                    Query.offset((+searchParams.page - 1) * 25),
                    Query.limit(25),
                ];
                if (searchParams.tag) fallbackQueries.push(Query.equal("tags", searchParams.tag));
                questions = await databases.listDocuments(db, questionCollection, fallbackQueries);
                console.log("Questions with fallback queries:", questions);
            }
        } else {
            console.log("Trying basic queries:", basicQueries.map(q => JSON.stringify(q)));
            questions = await databases.listDocuments(db, questionCollection, basicQueries);
            console.log("Questions with basic queries:", questions);
        }
    }

    questions.documents = await Promise.all(
        questions.documents.map(async ques => {
            const [author, answers, votes] = await Promise.all([
                users.get<UserPrefs>(ques.authorId),
                databases.listDocuments(db, answerCollection, [
                    Query.equal("questionId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", "question"),
                    Query.equal("typeId", ques.$id),
                    Query.limit(1), // for optimization
                ]),
            ]);

            return {
                ...ques,
                totalAnswers: answers.total,
                totalVotes: votes.total,
                author: {
                    $id: author.$id,
                    reputation: author.prefs.reputation,
                    name: author.name,
                },
            };
        })
    );

    return (
        <div className="container mx-auto px-4 pb-20 pt-36">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold">All Questions</h1>
                <Link href="/questions/ask">
                    <ShimmerButton className="shadow-2xl">
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                            Ask a question
                        </span>
                    </ShimmerButton>
                </Link>
            </div>
            <div className="mb-4">
                <Search />
            </div>
            <div className="mb-4">
                <p>{questions.total} questions</p>
            </div>
            <div className="mb-4 max-w-3xl space-y-6">
                {questions.documents.length > 0 ? (
                    questions.documents.map(ques => (
                        <QuestionCard key={ques.$id} ques={ques} />
                    ))
                ) : (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            No questions found
                        </h3>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                            {searchParams.search
                                ? `No questions match your search for "${searchParams.search}"`
                                : "Be the first to ask a question!"}
                        </p>
                        <Link href="/questions/ask">
                            <ShimmerButton className="shadow-2xl">
                                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                    Ask the first question
                                </span>
                            </ShimmerButton>
                        </Link>
                    </div>
                )}
            </div>
            <Pagination total={questions.total} limit={25} />
        </div>
    );
};

export default Page;
