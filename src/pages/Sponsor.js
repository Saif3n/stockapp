
const INITIAL_MAX_HEIGHT = 10000;

const Collapse = ({ children }) => {
  const collapseMenuRef = React.useRef(null);
  const isFirstRender = React.useRef(true);
  const maxHeightRef = React.useRef(INITIAL_MAX_HEIGHT);
  const [isOpen, setOpen] = React.useReducer((state) => !state, false);
  React.useEffect(() => {
    if (collapseMenuRef.current && !isFirstRender.current) {
      if (
        maxHeightRef.current > collapseMenuRef.current.offsetHeight &&
        maxHeightRef.current !== INITIAL_MAX_HEIGHT
      ) {
      // HALT!! // Someone collapsed the menu too early! // The offsetHeight is not full.
        return;
      }
      maxHeightRef.current = collapseMenuRef.current.offsetHeight;
    }
    if (isOpen && isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [isOpen]);
  return (
      <div
        style={
          isOpen ? { maxHeight: maxHeightRef.current } : { maxHeight: 0 }
        }
        ref={collapseMenuRef}
      >
        {children}
      </div>
  );
};