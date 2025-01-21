import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import {Textarea} from "@heroui/react";



export default function HomePage() {
        const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
            <>
                <Button onPress={onOpen}>Open Drawer</Button>
                <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                    <DrawerContent>
                        {(onClose) => (
                            <>
                                <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
                                <DrawerBody>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                        risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                        quam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                        risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                        quam.
                                    </p>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                        adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                        officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                        nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                                        deserunt nostrud ad veniam.
                                    </p>
                                </DrawerBody>
                                <DrawerFooter>
                                    <Textarea className="max-w-xs" label="Description" placeholder="Enter your description" />
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </DrawerFooter>
                            </>
                        )}
                    </DrawerContent>
                </Drawer>
            </>
        );

}