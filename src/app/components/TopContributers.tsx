import { cn } from "@/lib/utils";

import { AnimatedList } from "@/components/magicui/animated-list";
import { users } from "@/models/server/config";
import { Models, Query } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";
import convertDateToRelativeTime from "@/utils/relativeTime";

const Notification = ({ user }: { user: Models.User<UserPrefs> }) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-2xl bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
                        <span className="text-sm sm:text-lg">{user.name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">
                            {convertDateToRelativeTime(new Date(user.$updatedAt))}
                        </span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        <span>Reputation</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{user.prefs.reputation}</span>
                    </p>
                </div>
            </div>
        </figure>
    );
};

export default async function TopContributers() {
    let topUsers: { total: number; users: Models.User<UserPrefs>[] };
    
    try {
        topUsers = await users.list<UserPrefs>([Query.limit(10)]);
        console.log("TopContributers - Users fetched:", topUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        // Return empty state on error
        topUsers = { total: 0, users: [] };
    }

    return (
        <div className="bg-background relative flex max-h-[400px] min-h-[400px] w-full max-w-[32rem] flex-col overflow-hidden rounded-lg bg-white/10 p-6 shadow-lg">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-white">Top Contributors</h3>
            </div>
            {topUsers.users.length > 0 ? (
                <AnimatedList>
                    {topUsers.users.map(user => (
                        <Notification user={user} key={user.$id} />
                    ))}
                </AnimatedList>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <p className="text-white/60 text-sm mb-2">No contributors yet</p>
                        <p className="text-white/40 text-xs">Be the first to contribute!</p>
                    </div>
                </div>
            )}
        </div>
    );
}
