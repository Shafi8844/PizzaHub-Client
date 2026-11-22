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
    const [errorMessage,setErrorMessage]=useState("");
    const [isDeleting,setIsDeleting]=useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setErrorMessage("");
        setIsDeleting(true);
        try {
          const response = await deleteMenuItem(menu._id);
          if(response.deletedCount){
            setOpen(false);
            router.refresh();
          } else {
            setErrorMessage(response.error ?? "Menu item could not be deleted");
          }
        } catch {
          setErrorMessage("Menu item could not be deleted. Please try again.");
        } finally {
          setIsDeleting(false);
        }
    }
  return (
    <AlertDialog open={open} onOpenChange={(nextOpen) => { setOpen(nextOpen); if (!nextOpen) setErrorMessage("") }}>
      <AlertDialogTrigger render={<Button variant="outline" aria-label={`Delete ${menu.itemName}`}><Trash2Icon /></Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Delete {menu.itemName}?</AlertDialogTitle>
          <AlertDialogDescription>
              This will permanently remove this menu item from PizzaHub.
          </AlertDialogDescription>
        </AlertDialogHeader>
          {errorMessage ? <p role="alert" className="rounded-lg bg-brand-tint px-3 py-2 text-sm text-brand">{errorMessage}</p> : null}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-brand text-white hover:bg-brand-hover">{isDeleting ? "Deleting..." : "Delete Item"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
