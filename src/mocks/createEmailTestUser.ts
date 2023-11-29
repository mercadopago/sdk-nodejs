function createEmailTestUser() {
	const random = Math.floor(Math.random() * 1000000);
	const email = 'test_user' + random + '@testuser.com';
	return email;
}

export {
	createEmailTestUser
};

