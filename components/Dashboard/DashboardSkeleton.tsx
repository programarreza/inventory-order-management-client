import { Skeleton } from "@heroui/react";

export function DashboardSkeleton() {
	return(
		<div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-10 mb-20 md:mb-10">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				  <Skeleton className="w-64 h-10 rounded-lg" />
				</div>
		
				{/* Stats Grid Skeleton */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
				  {[1, 2, 3, 4, 5].map((i) => (
					<div key={i} className="h-32 rounded-2xl border border-divider bg-background/60 backdrop-blur-md p-6 flex flex-row items-center gap-4">
					  <Skeleton className="w-12 h-12 rounded-2xl" />
					  <div className="flex flex-col gap-2 flex-1">
						<Skeleton className="w-20 h-3 rounded-lg" />
						<Skeleton className="w-12 h-6 rounded-lg" />
					  </div>
					</div>
				  ))}
				</div>
		
				{/* Main Content Grid Skeleton */}
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
				  <div className="xl:col-span-2">
					 <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
						<div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
						   <Skeleton className="w-32 h-6 rounded-lg" />
						   <Skeleton className="w-24 h-4 rounded-lg" />
						</div>
						<div className="p-6 space-y-8">
						   {[1, 2, 3, 4, 5].map((i) => (
							 <div key={i} className="flex justify-between items-center border-b border-divider pb-4 last:border-0">
							   <Skeleton className="w-48 h-4 rounded-lg" />
							   <Skeleton className="w-12 h-8 rounded-lg" />
							   <Skeleton className="w-20 h-8 rounded-lg" />
							 </div>
						   ))}
						</div>
					 </div>
				  </div>
				  <div className="bg-background/60 dark:bg-default-50/50 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-divider h-[480px]">
					<Skeleton className="w-32 h-6 rounded-lg mb-8" />
					<div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-divider">
					  {[1, 2, 3, 4, 5].map((i) => (
						<div key={i} className="relative pl-8">
						  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-default-200 border-4 border-background" />
						  <div className="flex flex-col gap-2">
							<Skeleton className="w-full h-4 rounded-lg" />
							<Skeleton className="w-24 h-3 rounded-lg" />
						  </div>
						</div>
					  ))}
					</div>
				  </div>
				</div>
			  </div>
	)

}