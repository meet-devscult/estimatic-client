import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface PopupForFormProps<T extends FieldValues> {
  title: string;
  triggerText: React.ReactNode;
  form: React.ReactNode;
  submitFunction: () => Promise<void>;
  buttonText: string;
  formInstance?: UseFormReturn<T>;
  enableCloseButton?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  isValidate?: boolean;
}
  
export default function PopupForForm<T extends FieldValues>({ 
  title, 
  triggerText, 
  form, 
  submitFunction, 
  buttonText, 
  formInstance,
  enableCloseButton = false,
  isLoading = false,
  loadingText = "Loading...",
  isValidate = false
}: PopupForFormProps<T>) {

  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async () => {
    if (formInstance) {
      formInstance.trigger();

      if (isValidate && formInstance.formState.isValid ) {
        await submitFunction().then(() => {
          setIsOpen(false);
          formInstance.reset();
        });
      }
      else if(!isValidate){
        await submitFunction().then(() => {
          setIsOpen(false);
          formInstance.reset();
        });
      }
    }
    else{
      toast.error("No form instance found");
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    formInstance?.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerText}
      </DialogTrigger>
      <DialogContent className="border-dashed flex flex-col p-0 sm:max-h-[min(640px,80vh)] sm:max-w-xl" enableCloseButton={enableCloseButton}>
        <DialogHeader className="p-5">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader> 
        <ScrollArea className="flex max-h-full flex-col overflow-hidden">
          {form}
        </ScrollArea>
        <DialogFooter className="p-5">
          <Button variant="destructive" onClick={handleCancel}>Cancel</Button>
          <Button 
            type="submit"
            className="dark:bg-white bg-black dark:text-black text-white hover:bg-black"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? loadingText : buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
  