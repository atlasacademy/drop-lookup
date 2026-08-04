import { ItemDataType, sheetNames } from "@/pages";
import styles from "@/styles/ItemSelector.module.css";

import Image from "next/image";
import { useState } from "react";

import ItemTable from "./ItemTable";

const ItemSelector = ({ itemData }: { itemData: ItemDataType }) => {
    const [selectedItemName, setSelectedItemName] = useState("");
    const [selectedSheet, setSelectedSheet] = useState<(typeof sheetNames)[number]>(sheetNames[0]);
    const [isExpanded, setIsExpanded] = useState(false);

    const selectedItem = selectedItemName ? itemData[selectedSheet].find((item) => item.name === selectedItemName) : undefined;

    const reset = () => {
        setIsExpanded(false);
        setSelectedItemName("");
    };

    const setSheet = (sheet: typeof selectedSheet) => {
        setSelectedSheet(sheet);

        if (selectedItemName && !itemData[sheet].some((item) => item.name === selectedItemName)) {
            setSelectedItemName("");
        }
    };

    return (
        <>
            <div className={styles.itemContainer}>
                {/* Rarity/mat-type filters are unnecessary, too much clutter for no benefit */}
                <select
                    className={styles.sheetDropdown}
                    aria-label="Select drop category"
                    value={selectedSheet}
                    onChange={(e) => setSheet(e.target.value as typeof selectedSheet)}
                >
                    {sheetNames.map((sheetName) => (
                        <option key={sheetName}>{sheetName}</option>
                    ))}
                </select>
                {selectedItem ? (
                    <div className={styles.selectedImageContainer}>
                        <span>
                            Selected:{" "}
                            <Image
                                key={selectedItem.name}
                                className={styles.itemImage}
                                height="60"
                                width="60"
                                onClick={reset}
                                src={selectedItem.image}
                                alt={selectedItem.name}
                            />{" "}
                            {selectedItem.name}
                        </span>
                        <span
                            title={isExpanded ? "Collapse" : "Expand"}
                            className={styles.expandCollapseButton + (isExpanded ? ` ${styles.rotate90}` : "")}
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            ◀
                        </span>
                    </div>
                ) : (
                    <p style={{ marginTop: "2rem" }}>Select a mat from below.</p>
                )}
                {!selectedItem || isExpanded ? (
                    <div className={styles.itemImageContainer}>
                        {itemData[selectedSheet].map((item) => (
                            <Image
                                key={item.name}
                                className={styles.itemImage + (item.name === selectedItem?.name ? ` ${styles.selectedItem}` : "")}
                                height="60"
                                width="60"
                                src={item.image}
                                alt={item.name}
                                onClick={() => setSelectedItemName(item.name)}
                            />
                        ))}
                    </div>
                ) : (
                    null
                )}
            </div>
            {selectedItem ? <ItemTable selectedItem={selectedItem}></ItemTable> : null}
            <button onClick={reset} className={styles.resetButton}>
                Reset
            </button>
        </>
    );
};

export default ItemSelector;
