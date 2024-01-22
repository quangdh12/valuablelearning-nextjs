const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
	try {
		await database.category.createMany({
			data: [
				{ name: 'Computer Science' },
				{ name: 'Music' },
				{ name: 'Photography' },
				{ name: 'Engineering' },
				{ name: 'Accounting' },
				{ name: 'Filming' },
				{ name: 'Fitness' },
			],
		})

		console.log('Success')
	} catch (error) {
		console.log('🚀 ~ file: seed.ts:9 ~ main ~ error:', error)
	} finally {
		await database.$disconnect()
	}
}

main()
