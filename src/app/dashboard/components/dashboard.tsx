import type { Expense, Income } from '@prisma/client'
import type { FC, PropsWithChildren } from 'react'

import { AddTransaction } from './add-transaction'
import { Chart } from './chart'

interface DashboardProps {
  incomes: Income[]
  expenses: Expense[]
}

export const Dashboard: FC<DashboardProps> = ({ incomes, expenses }) => {
  // Calculations
  const totalIncome = () => incomes?.reduce((a, b) => a + b.amount, 0)
  const totalExpenses = () => expenses?.reduce((a, b) => a + b.amount, 0)
  const balance = totalIncome() - totalExpenses()

  return (
    <div className="grid gap-10 lg:grid-cols-3 p-5 md:p-10">
      {/* Insights Section */}
      <section className="lg:col-span-2 space-y-10">
        <div className="space-y-5">
          <Heading>Dashboard</Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DashboardCard
              title="Balance"
              amount={balance}
              className="md:col-span-2"
            />
            <DashboardCard title="Income" amount={totalIncome()} />
            <DashboardCard title="Expense" amount={totalExpenses()} />
          </div>
        </div>

        <div className="space-y-5">
          <Heading>Analysis</Heading>
          <Chart incomes={incomes} expenses={expenses} />
        </div>
      </section>

      {/* Floating Button */}
      <AddTransaction />
    </div>
  )
}

function Heading({ children }: PropsWithChildren) {
  return <h1 className="text-4xl font-extrabold">{children}</h1>
}

function DashboardCard({
  title,
  amount,
  className,
}: {
  title: string
  amount: number
  className?: string
}) {
  return (
    <div
      className={cn(
        'p-5 h-40 w-full flex flex-col justify-end gap-2 rounded-2xl bg-accent',
        className
      )}
    >
      <h1 className="capitalize font-medium">{title}</h1>
      <p className="text-5xl font-semibold">$ {amount}</p>
    </div>
  )
}
