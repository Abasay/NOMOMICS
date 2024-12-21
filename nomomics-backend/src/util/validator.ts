import Joi from 'joi';

class Validator {
	static validateUser(data: any) {
		const schema = Joi.object({
			username: Joi.string()
				.alphanum()
				.min(3)
				.max(30)
				.required(),
			email: Joi.string().email().required(),
			password: Joi.string()
				.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
				.required(),
		});

		return schema.validate(data);
	}

	validateComment = Joi.object({
		episodeId: Joi.string().required(),
	});
}

export default new Validator();
