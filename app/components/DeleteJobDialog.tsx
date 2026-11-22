"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { MenuItem } from "@/lib/api/menu"
import { Trash2Icon } from "lucide-react"
import { deleteMenuItem } from "@/lib/actions/menu"
import { useState } from "react"
import { useRouter } from "next/navigation"


export function DeleteJobDialog({menu}:{menu:MenuItem}) {
    
    const [open,setOpen]=useState(false);
    const router = useRouter();

    const handleDelete = async () => {;
        const response = await deleteMenuItem(menu._id);
        if(response.deletedCount){
            setOpen(false);
            router.refresh();
        }
        console.log("delete response:", menu._id, response);
    }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="outline"><Trash2Icon /></Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-brand text-white hover:bg-brand-hover">Delete Item</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
