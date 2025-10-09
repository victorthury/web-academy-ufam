import { LoremIpsum } from 'lorem-ipsum';

function generateLoremByParagraphs(paragraphs: number) {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });
  return lorem.generateParagraphs(paragraphs).replaceAll('\n', '<br><br>');
}

export default generateLoremByParagraphs;
