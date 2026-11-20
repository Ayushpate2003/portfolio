import { useEffect } from 'react'

function descriptionTag(): HTMLMetaElement | null {
  return document.querySelector('meta[name="description"]')
}

/** Sets the page title and meta description for the current route and restores them on unmount. */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title
    const tag = descriptionTag()
    const previousDescription = tag?.getAttribute('content') ?? null

    document.title = title
    if (description && tag) tag.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      if (tag && previousDescription !== null) tag.setAttribute('content', previousDescription)
    }
  }, [title, description])
}
