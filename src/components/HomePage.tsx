import React, { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Textarea,
} from "@heroui/react";
import Earth from "./Earth";

interface Country {
    properties: {
        ADMIN: string; // Nom du pays
        ISO_A2: string; // Code ISO
        GDP_MD_EST: number; // PIB estimé
        POP_EST: number; // Population estimée
    };
}

const HomePage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        onOpen();
    };

    const handleModalClose = () => {
        setSelectedCountry(null); // Réinitialise la sélection
        onClose(); // Ferme la modal
    };

    return (
        <div className="homepage">
            <Earth onCountrySelect={handleCountrySelect} isModalOpen={isOpen} />
            <Drawer isOpen={isOpen} onOpenChange={(isOpen) => !isOpen && handleModalClose()}>
                <DrawerContent>
                    <DrawerHeader className="flex flex-col gap-1">
                        {selectedCountry?.properties.ADMIN || "Select a Country"}
                    </DrawerHeader>
                    <DrawerBody>
                        {selectedCountry ? (
                            <>
                                <p><b>Country:</b> {selectedCountry.properties.ADMIN}</p>
                                <p><b>ISO Code:</b> {selectedCountry.properties.ISO_A2}</p>
                                <p><b>GDP Estimate:</b> {selectedCountry.properties.GDP_MD_EST.toLocaleString()} USD</p>
                                <p><b>Population:</b> {selectedCountry.properties.POP_EST.toLocaleString()}</p>
                            </>
                        ) : (
                            <p>No country selected. Please click on a country to see details.</p>
                        )}
                    </DrawerBody>
                    <DrawerFooter>
                        <Textarea
                            className="max-w-xs"
                            label="Notes"
                            placeholder="Add your notes here"
                        />
                        <Button color="primary" onPress={handleModalClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default HomePage;
