"use client"


import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

export type Flashcard = {
  front :string
  back : string
}

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
export const columns: ColumnDef<Flashcard>[] = [
    {
        id: "select",
        header(props) {
          function onSubmit(data: z.infer<typeof FormSchema>) {
            // const requestOptions = {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ prompt : `Van ban goc : ${data.article} - Van ban cua user${data.content}`})
            //   };
            //   // Gửi yêu cầu POST đến máy chủ
            //   fetch('/api/compare', requestOptions)
            //     .then(response => {
            //       // Kiểm tra nếu yêu cầu thành công
            //       if (response.ok) {
            //         // Xử lý dữ liệu trả về từ máy chủ (nếu cần)
            //         return response.json();
            //       }
            //       // Nếu có lỗi, ném ra một lỗi
            //       throw new Error('Network response was not ok.');
            //     })
            //     .then(data => {
            //       // Xử lý dữ liệu trả về từ máy chủ (nếu cần)
            //       console.log('Response from server:', data);
            //     })
            //     .catch(error => {
            //       // Xử lý lỗi (nếu có)
            //       console.error('Error sending POST request:', error);
            //     });
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ front : data.front , back : data.back })
              };
              // Gửi yêu cầu POST đến máy chủ
              fetch('/api/article', requestOptions)
                .then(response => {
                  // Kiểm tra nếu yêu cầu thành công
                  if (response.ok) {
                    // Xử lý dữ liệu trả về từ máy chủ (nếu cần)
                    return response.json();
                  }
                  // Nếu có lỗi, ném ra một lỗi
                  throw new Error('Network response was not ok.');
                })
                .then(data => {
                  // Xử lý dữ liệu trả về từ máy chủ (nếu cần)
                  console.log('Response from server:', data);
                })
                .catch(error => {
                  // Xử lý lỗi (nếu có)
                  console.error('Error sending POST request:', error);
                });
          }
          const FormSchema = z.object({
            front: z.string(),
            back: z.string(),
          })
          const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
          })
          
          return (
            <Dialog>
            <DialogTrigger>
              +
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="front"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Article name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Article name"
                            className="w-full px-3 py-2 border rounded-md"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="back"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Article content</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Article content"
                            className="w-full px-3 py-2 border rounded-md"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          )
        },

        cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
    },
    {
        accessorKey: "front",
        header: "Front",
      },
  {
    accessorKey: "back",
    header: "Back",
  },
]