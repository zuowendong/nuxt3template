export function useRenderDriver(popover, options?: {
  onClose?: () => void
}) {
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="14" fill="#D9D9D9" fill-opacity="0.5"/>
        <path d="M14 15.7935L10.1954 19.6087C9.95489 19.8478 9.64877 19.9674 9.27705 19.9674C8.90534 19.9674 8.59922 19.8478 8.3587 19.6087C8.11957 19.3696 8 19.0652 8 18.6957C8 18.3261 8.11957 18.0217 8.3587 17.7826L12.1739 13.9674L8.3587 10.1955C8.11957 9.95493 8 9.6488 8 9.27709C8 8.90535 8.11957 8.59922 8.3587 8.3587C8.59783 8.11957 8.90217 8 9.27174 8C9.6413 8 9.94565 8.11957 10.1848 8.3587L14 12.1739L17.7719 8.3587C18.0125 8.11957 18.3186 8 18.6903 8C19.062 8 19.3682 8.11957 19.6087 8.3587C19.8696 8.61957 20 8.92935 20 9.28804C20 9.64674 19.8696 9.94565 19.6087 10.1848L15.7935 13.9674L19.6087 17.772C19.8478 18.0125 19.9674 18.3186 19.9674 18.6903C19.9674 19.0621 19.8478 19.3682 19.6087 19.6087C19.3478 19.8696 19.038 20 18.6793 20C18.3207 20 18.0217 19.8696 17.7826 19.6087L14 15.7935Z" fill="white"/>
      </svg>
    `;
    closeBtn.classList.add("text-white", "flex", "items-center", "justify-center", "w-[28PX]", "h-[28PX]", 'absolute', 'top-[-20PX]', 'right-[-30PX]');
    popover.wrapper.appendChild(closeBtn);
    closeBtn.addEventListener("click", () => {
      options?.onClose?.();
    });

    if(popover.nextButton.innerHTML === '完成') {
      return;
    }

    const nextIcon = document.createElement("div");
    nextIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M0 1.5275L4.80822 6.5L0 11.4725L1.47703 13L7.76229 6.5L1.47703 0L0 1.5275ZM10.9049 0H13V13H10.9049V0Z" fill="white"/>
      </svg>
    `;
    nextIcon.classList.add("size-[13PX]");
    popover.nextButton.appendChild(nextIcon);
}