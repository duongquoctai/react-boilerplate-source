export function debounce(timer = null, delay = 250, cbFunc = () => {}) {
	if (timer) clearTimeout(timer);
	timer = setTimeout(cbFunc, delay);
	return timer;
}
