'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { ExpenseType } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputForm } from '@/components/ui/input-form'
import { ExpensePayload, ExpenseValidator } from '@/lib/validators'
import { addExpenseAction } from '@/lib/actions/add-expense'

export const AddExpenseForm = () => {
  const form = useForm<ExpensePayload>({
    resolver: zodResolver(ExpenseValidator),
  })

  function onSubmit(data: ExpensePayload) {
    console.log({ data })
    const promise = addExpenseAction(data)

    toast.promise(promise, {
      loading: 'Adding Expense...',
      success: () => {
        form.reset({
          title: undefined,
          amount: undefined,
          date: undefined,
          description: undefined,
          type: undefined,
        })
        return 'Expense successfully added!'
      },
      error: 'Error adding expense!',
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-sm"
      >
        <InputForm form={form} types={Object.keys(ExpenseType)} />

        <Button type="submit">Add Expense</Button>
      </form>
    </Form>
  )
}
