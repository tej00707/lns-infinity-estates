import User from '../../models/User.js';

const addFavorite = async (req, res, next) => {
	try {
		const userId = req.user?.id;
		const propertyId = req.params?.propertyId || req.body?.propertyId;

		if (!propertyId) {
			throw new Error('propertyId is required');
		}

		const user = await User.findById(userId);

		if (!user) {
			throw new Error('User not found');
		}

		const alreadyFavorite = user.favorites.some(
			(favoriteId) => favoriteId.toString() === propertyId
		);

		if (!alreadyFavorite) {
			user.favorites.push(propertyId);
			await user.save();
		}

		return res.status(200).json({ success: true, data: user.favorites });
	} catch (error) {
		return next(error);
	}
};

const removeFavorite = async (req, res, next) => {
	try {
		const userId = req.user?.id;
		const propertyId = req.params?.propertyId || req.body?.propertyId;

		if (!propertyId) {
			throw new Error('propertyId is required');
		}

		const user = await User.findById(userId);

		if (!user) {
			throw new Error('User not found');
		}

		user.favorites = user.favorites.filter(
			(favoriteId) => favoriteId.toString() !== propertyId
		);

		await user.save();

		return res.status(200).json({ success: true, data: user.favorites });
	} catch (error) {
		return next(error);
	}
};

const getFavorites = async (req, res, next) => {
	try {
		const userId = req.user?.id;

		const user = await User.findById(userId).populate('favorites');

		if (!user) {
			throw new Error('User not found');
		}

		return res.status(200).json({ success: true, data: user.favorites });
	} catch (error) {
		return next(error);
	}
};

export { addFavorite, removeFavorite, getFavorites };
