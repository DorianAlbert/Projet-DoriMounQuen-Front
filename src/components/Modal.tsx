import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import Navbar from "./Navbar";
import NewForm from "./NewForm";
import OldList from "./OldList";
import Login from "./Login";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetGlobe: () => void; // Prop pour réinitialiser le globe
  country: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedMode, setSelectedMode] = React.useState<"new" | "old" | "login" | null>("new");

  const handleModeChange = (value: "new" | "old" | "login") => {
    setSelectedMode(value);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      className="w-full h-screen"
    >
      <DrawerContent className="w-full h-full">
        <DrawerHeader>
          <Navbar onSelect={handleModeChange} />
        </DrawerHeader>
        <DrawerBody className="flex-grow">
          {selectedMode === "new" && <NewForm />}
          {selectedMode === "old" && <OldList />}
          {selectedMode === "login" && <Login />}
        </DrawerBody>
        <DrawerFooter>
          <Button color="secondary" onPress={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Modal;
