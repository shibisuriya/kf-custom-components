let kf;

function getProfileInfo() {
	// /id api inside kissflow fetches user and account details...
	kf.api("/id").then((res) => {
		console.info("API response is", res);
		document.getElementById(
			"output"
		).innerText = `Hi ${res.UserDetails.Name}`;
	});
}

function showInfo() {
	// Similarly we can also get user and account details
	// via kf.user and kf.account respectively

	kf.client.showInfo(kf.user);
	kf.client.showInfo(kf.account);
}

window.onload = async function () {
	kf = await window.kf.initialise();
	document.getElementById("device").innerText = `${
		kf.env?.isMobile ? "Mobile" : "Desktop"
	}`;
	kf.context.watchParams(function (data) {
		console.log("watch params data", data);
		document.getElementById("output2").innerText = JSON.stringify(data);
	});
};

function hideComp() {
	kf.app.page.getComponent("Container002").then((comp) => comp.hide());
}
