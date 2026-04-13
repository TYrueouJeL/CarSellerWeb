import type { AdonisPage } from "~/types/api";

export function usePaginatedList<T>(
    fetcher: (page: number) => Promise<AdonisPage<T>>
) {
    const items = ref<T[]>([])
    const meta = ref<AdonisPage<T>['meta'] | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const currentPage = ref(1)

    const fetch = async (page = 1) => {
        loading.value = true
        error.value = null
        
        try {
            const res = await fetcher(page)
            items.value = res.data
            meta.value = res.meta
            currentPage.value = page
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Unknown error'
        } finally {
            loading.value = false
        }
    }

    const nextPage = () => meta.value?.nextPageUrl ? fetch(currentPage.value + 1) : null
    const prevPage = () => meta.value?.previousPageUrl ? fetch(currentPage.value - 1) : null
    
    return {
        items,
        meta,
        loading,
        error,
        currentPage,
        fetch,
        nextPage,
        prevPage
    }
}