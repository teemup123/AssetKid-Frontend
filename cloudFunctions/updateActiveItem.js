//Delete item from seeking support after collection is verified ! 

Moralis.Cloud.afterSave("VerifiedCollection", async (request) => {
    const confirmed = request.object.get("confirmed")
    console.log(confirmed)
    const logger = Moralis.Cloud.getLogger()
    logger.info(logger)
    logger.info("Looking for confirmed Tx . . . ")

    if (confirmed) {
        logger.info("Found item!")
        const ActiveItem = Moralis.Object.extend("ActiveCollection")
        logger.info(ActiveItem)
        const activeItem = new ActiveItem()
        logger.info(activeItem)
        activeItem.set("collectionId", request.object.get("collectionId"))
        logger.info(request.object.get("collectionId"))
        activeItem.set("creator", request.object.get("creator"))
        logger.info(request.object.get("creator"))
        const TierCollectable = Moralis.Object.extend("TierCollectable")
        const query = new Moralis.Query(TierCollectable);
        logger.info(query.get("tokenIds"))
        activeItem.set("tokenIds", query.get("tokenIds"))
        logger.info("Saving...")
        await activeItem.save()
    }
}) 