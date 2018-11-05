const createResponse = function(isError="false",error="",success="",data=""){
	return {
		isError,
		error,
		success,
		data
	}
};
module.exports = createResponse;
