/**
 * Fallback component for loading state.
 */
export default function Skeleton() {
    return (
        <>
            {[...Array(10).keys()].map((item) => (
                <div key={item} className="relative group">
                    <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                        >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div>
                            <h3 className="text-sm text-gray-700">
                                <a href={`/products`}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    <div
                                        role="status"
                                        className="space-y-2.5 animate-pulse max-w-lg"
                                    >
                                        <div className="flex items-center w-full space-x-2">
                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                        </div>
                                        <div className="flex items-center w-full space-x-2 max-w-[480px]">
                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                        </div>
                                    </div>
                                </a>
                            </h3>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                            <span className="block bg-slate-400" />
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
}
