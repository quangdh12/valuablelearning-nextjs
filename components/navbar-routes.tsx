'use client'

import { Button } from '@/components/ui/button'
import { isTeacher } from '@/lib/teacher'
import { UserButton, useAuth } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchInput } from './search-input'

export const NavbarRoutes = () => {
	const { userId } = useAuth()
	const pathname = usePathname()

	const isTeacherPage = pathname?.startsWith('/teacher')
	const isCoursesPage = pathname?.includes('/courses')
	const isSearchPage = pathname === '/search'

	return (
		<>
			{isSearchPage && (
				<div className='hidden md:block'>
					<SearchInput />
				</div>
			)}
			<div className='flex gap-x-2 ml-auto'>
				{isTeacherPage || isCoursesPage ? (
					<Link href='/'>
						<Button>
							<LogOut className='h-4 w-4 mr-2' />
							Exit
						</Button>
					</Link>
				) : isTeacher(userId) ? (
					<Link href='/teacher/courses'>
						<Button
							size='sm'
							variant='ghost'
						>
							Teacher mode
						</Button>
					</Link>
				) : null}
				<UserButton afterSignOutUrl='/' />
			</div>
		</>
	)
}
