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

interface PopupForFormProps<T extends FieldValues> {
  title: string;
  triggerText: React.ReactNode;
  form: React.ReactNode;
  submitFunction: () => void;
  buttonText: string;
  formInstance?: UseFormReturn<T>;
  enableCloseButton?: boolean;
  isLoading?: boolean;
  loadingText?: string;
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
  loadingText = "Loading..."
}: PopupForFormProps<T>) {

  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = () => {
    // if (formInstance) {
    //   formInstance.trigger();

    //   console.log(formInstance.formState.isValid);
    //   if (formInstance.formState.isValid) {
    //     setIsOpen(false);
    //     submitFunction();
    //     formInstance.reset();
    //   }
    // } else {
    //   submitFunction();
    // }

    /**
     * Temparary changes
     */
    if(formInstance) {
      formInstance.trigger();
      setIsOpen(false);
      submitFunction();
      formInstance.reset();
    } else {
      console.log("no form instance");
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
  