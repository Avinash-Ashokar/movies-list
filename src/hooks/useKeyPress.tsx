import { useEffect } from "react";

const useKeyPress = (targetKey: string, callback: () => void) => {
  // Effect hook to handle key press events
  useEffect(() => {
    // Function to handle the key down event
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the pressed key matches the target key
      if (event.key === targetKey) {
        // Execute the callback function if the target key is pressed
        callback();
      }
    };

    // Add event listener for keydown events
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetKey, callback]); // Dependencies for the effect
};

export default useKeyPress;
