export function ProductSkeleton() {
    return (
        <div className="flex flex-col rounded-2xl border border-blue-100 bg-white p-3 dark:border-blue-800 dark:bg-blue-950">
            <div className="aspect-square w-full animate-pulse rounded-xl bg-blue-100 dark:bg-blue-900/50" />

            <div className="flex flex-1 flex-col pt-4 space-y-3">
                <div className="flex justify-between">
                    <div className="h-3 w-16 animate-pulse rounded bg-blue-100 dark:bg-blue-900/50" />
                    <div className="h-3 w-20 animate-pulse rounded bg-blue-100 dark:bg-blue-900/50" />
                </div>

                <div className="h-4 w-full animate-pulse rounded bg-blue-200 dark:bg-blue-900" />

                <div className="mt-auto flex items-end justify-between pt-2">
                    <div className="flex gap-3 items-center">
                        <div className="h-3 w-12 animate-pulse rounded bg-blue-100 dark:bg-blue-900/50" />
                        <div className="h-4 w-20 animate-pulse rounded bg-blue-200 dark:bg-blue-900" />
                    </div>
                </div>
            </div>
        </div>
    );
}