import React, { useState } from "react";
import Earth from "../components/Earth";
import Modal from "../components/Modal";

interface Country {
    properties: {
        ADMIN: string; // Nom du pays
        ISO_A2: string; // Code ISO
        GDP_MD_EST: number; // PIB estimé
        POP_EST: number; // Population estimée
    };
}

const HomePage: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedCountry(null);
        setModalOpen(false);
    };

    return (
      <div className="homepage">
          <Earth onCountrySelect={handleCountrySelect} />
          {selectedCountry && (
            <Modal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              country={selectedCountry}
            />
          )}
      </div>
    );
};

export default HomePage;
