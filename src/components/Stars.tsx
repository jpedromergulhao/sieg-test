import { Star } from "lucide-react";

export function Stars({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-1" aria-label={`Rating: ${value} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((i) => {
                const isFull = value >= i;
                const isHalf = value >= i - 0.5 && value < i;

                return (
                    <Star
                        key={i}
                        size={14}
                        className={`${isFull ? "fill-amber-400 text-amber-400" :
                            isHalf ? "fill-amber-400/50 text-amber-400" :
                                "text-blue-200 dark:text-blue-800"}`}
                    />
                );
            })}
        </div>
    );
}