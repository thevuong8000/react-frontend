/**
 * Download file from href
 * @param {string} href
 */
export const downloadFile = (href, fileName) => {
	const aTag = document.createElement("a");
	aTag.href = href;
	aTag.target = "_blank";
	aTag.download = fileName || "download";

	document.body.appendChild(aTag);
	aTag.click();
	document.body.removeChild(aTag);
};
