const { BlobServiceClient } = require("@azure/storage-blob");

// Prerequisite: Call "https://iq-services-reconciliation-int.azure.development.k8s.iqmetrix.net/<reconciliation-id>/allocateupload" and obtain the SAS URL.
// Update blobSasUrl with the Blob service SAS URL string and upload directly to Azure.
//const blobSasUrl = "https://iqreconcilevendorfiles.blob.core.windows.net/uploads-523806?sv=2024-08-04&se=2024-08-23T06%3A58%3A00Z&sr=c&sp=w&sig=diI8OndxCB5iwbKwhFBDCN5sN3MaUbpPu1VW%2BT3DP%2FU%3D";

// Upload files to the container...
const uploadFiles = async () => {
	try {
		const sasUrl = document.getElementById('sasurl').value;
		const reconciliationId = document.getElementById('reconciliationid').value;

		if (!sasUrl) {
			alert('Please enter a SAS URL.');
			return;
		}

		// Create a new BlobServiceClient
		const blobServiceClient = new BlobServiceClient(sasUrl);

		// Get a container client from the BlobServiceClient
		const containerClient = blobServiceClient.getContainerClient(reconciliationId);

		console.log("Uploading files...");
		const promises = [];
		for (const file of document.getElementById("file-input").files) {
			const blockBlobClient = containerClient.getBlockBlobClient(file.name);
			promises.push(blockBlobClient.uploadData(file));
		}
		await Promise.all(promises);
		console.log("Done.");
	}
	catch (error) {
		console.log(error.message);
	}
}

document.getElementById("select-button").addEventListener("click", () => document.getElementById("file-input").click());
document.getElementById("file-input").addEventListener("change", uploadFiles);