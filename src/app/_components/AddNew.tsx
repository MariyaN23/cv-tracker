import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import NewForm from "@/app/_components/NewForm";

export default function AddNew() {
    return (
        <div className={"mt-8"}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add new</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="pb-2">Enter vacancy details</DialogTitle>
                        <NewForm/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}