function getPredictionWithProcessedLink(prediction) {
  if (!prediction) {
    return prediction;
  }

  const { link = null, ...fields } = prediction;
  const hasLink = !!link && typeof link === "string";
  if (!hasLink) {
    return prediction;
  }

  const fileId = getFileIdFromLink(link);
  const linkToVideo = getVideoLink(fileId);
  const linkToDownload = getDownloadLink(fileId);

  return {
    ...fields,
    linkToVideo,
    linkToDownload,
  };
}

function getDownloadLink(fileId) {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}

function getVideoLink(fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

function getFileIdFromLink(link) {
  // Link refers to google drive and has next format:
  // https://drive.google.com/file/d/VIDEO_ID/view?usp=sharing

  const patternBeforeId = "file/d/";
  const startIdIndex = link.indexOf(patternBeforeId) + patternBeforeId.length;
  const patternAfterId = "/view";
  const endIdIndex = link.indexOf(patternAfterId);

  const fileId = link.substring(startIdIndex, endIdIndex);

  return fileId;
}

module.exports = {
  getPredictionWithProcessedLink,
};
