"use client";

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import CategoryIcon from "../ui/CategoryIcon"
import LogoSideBar from "../ui/LogoSideBar"
import { getCategories } from '@/actions/get-categories-action'
import { Category } from '@prisma/client'

export default function OrderSidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ restaurant: string }>()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (categorySlug: string) => {
    const currentTableId = searchParams.get('table')
    const newUrl = `/menu/${params.restaurant}/${categorySlug}${currentTableId ? `?table=${currentTableId}` : ''}`
    router.push(newUrl)
  }

  return (
    <Suspense>
    <>
    <aside className="md:w-72 md:h-screen bg-white">
      <div className="p-5 md:p-0">
        <div className="bg-white">
          <LogoSideBar />
        </div>
        <div className="sm:hidden mt-5">
          <details className="group">
            <summary className="text-lg font-bold py-2 px-4 cursor-pointer">
              Categorías
            </summary>
            <nav className="mt-2 group-open:block hidden">
              {categories.map((category) => (
                <CategoryIcon 
                  key={category.id} 
                  category={category} 
                  onClick={() => handleCategoryClick(category.slug)}
                />
              ))}
            </nav>
          </details>
        </div>
        <nav className="hidden sm:block mt-10 bg-white">
          {categories.map((category) => (
            <CategoryIcon 
              key={category.id} 
              category={category} 
              onClick={() => handleCategoryClick(category.slug)}
            />
          ))}
        </nav>
      </div>
    </aside>
    </>
    </Suspense>
  )
}
