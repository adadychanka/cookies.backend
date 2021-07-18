-- Insert dogecoin art start

-- Before inserting art need to create row in related tables

-- 1. Create row in Tokens table
INSERT INTO public."Tokens"(
	id, nft, "createdAt", "updatedAt")
	VALUES ('9f5bbbd1-abd9-4703-b165-3762e07d05b2', 'YOUR_NFT_NUMBER', now(), now());

-- 2. Create row in ArtCategories table
INSERT INTO public."ArtCategories"(
	id, name, description, "isActive", "createdAt", "updatedAt")
	VALUES (1, 'Crypto tokens', 'Crypto tokens', true, now(), now());

-- 3. Create row in Artists table
INSERT INTO public."Artists"(
	id, name, description, "isActive", "createdAt", "updatedAt")
	VALUES (1, 'YOUR_ART_AUTHOR', 'YOUR_ART_AUTHOR', true, now(), now());

-- 4. Create row in Arts table
INSERT INTO public."Arts"(
	id, name, description, "linkToBuy", "linkToArt", amount, "isActive", "tokenId", "artCategoryId", "createdBy", "createdAt", "updatedAt")
	VALUES ('4e18b3aa-7d95-4ccf-ae1f-4f93fd341bb0', 'Ðogecoin Prediction Ball', 'Ðogecoin Prediction Ball', null, null, 10, true, '9f5bbbd1-abd9-4703-b165-3762e07d05b2', 1, 1, now(), now());

-- Insert dogecoin art end


-- Insert dogecoin art predictions start

INSERT INTO public."Predictions"(
	text, link, "isActive", "artCategoryId", "artId", "createdAt", "updatedAt")
	VALUES ('Prediction #1', null, true, 1, '4e18b3aa-7d95-4ccf-ae1f-4f93fd341bb0', now(), now()),
		   ('Prediction #2', null, true, 1, '4e18b3aa-7d95-4ccf-ae1f-4f93fd341bb0', now(), now());

-- Insert dogecoin art predictions end
