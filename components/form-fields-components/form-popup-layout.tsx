import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface PopupForFormProps<T extends FieldValues> {
  title: string;
  triggerText: React.ReactNode;
  form: React.ReactNode;
  submitFunction: () => void;
  buttonText: string;
  formInstance?: UseFormReturn<T>;
}
  
export default function PopupForForm<T extends FieldValues>({ 
  title, 
  triggerText, 
  form, 
  submitFunction, 
  buttonText, 
  formInstance 
}: PopupForFormProps<T>) {
  const handleSubmit = () => {
    if (formInstance) {
      // Trigger form validation
      formInstance.trigger();
      
      // Check if form is valid
      if (formInstance.formState.isValid) {
        submitFunction();
      }
    } else {
      submitFunction();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {triggerText}
      </AlertDialogTrigger>
      <AlertDialogContent className="border-dashed min-w-1/2">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader> 
        {form}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            type="submit"
            className="dark:bg-white bg-black dark:text-black text-white hover:bg-black"
            onClick={handleSubmit}
          >
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
  