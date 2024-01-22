import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import { CoursesList } from '@/components/courses-list'
import { UserButton, auth } from '@clerk/nextjs'
import { CheckCircle, Clock } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import { InfoCard } from './_components/info-card'

const Dashboard = async () => {
	const { userId } = auth()

	if (!userId) {
		return redirect('/')
	}

	const { completedCourses, coursesInProgress } = await getDashboardCourses(
		userId,
	)

	return (
		<div className='p-6 space-y-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<InfoCard
					icon={Clock}
					label='In Progress'
					numberOfItems={coursesInProgress.length}
					variant='default'
				/>
				<InfoCard
					icon={CheckCircle}
					label='Completed'
					numberOfItems={completedCourses.length}
					variant='success'
				/>
			</div>
			<CoursesList items={[...completedCourses, ...coursesInProgress]} />
		</div>
	)
}

export default Dashboard
