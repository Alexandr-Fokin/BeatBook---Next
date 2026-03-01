import { getFolderItems } from "@/actions/app/items"
import { useQuery } from "@tanstack/react-query"

export const useFolderItems = (folderId:string)=> {
    return useQuery({
        queryKey: ['folder-items',folderId],
        queryFn: () => getFolderItems(folderId),
        enabled: !!folderId,
        staleTime: 1000 * 60 * 5,
    })
}