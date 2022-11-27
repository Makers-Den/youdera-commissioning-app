import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { LanguageSelect } from 'ui/select/LanguageSelect';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: LanguageSelect,
  title: 'Components/LanguageSelect',
} as ComponentMeta<typeof LanguageSelect>;

const Template: ComponentStory<typeof LanguageSelect> = args => (
  <CenterWrapper>
    <LanguageSelect {...args} />
  </CenterWrapper>
);

export const Overview = () => {
  const [language, setLanguage] = useState('Abkhazian');
  return (
    <CenterWrapper>
      <LanguageSelect
        options={[
          'Abkhazian',
          'Afar',
          'Afrikaans',
          'Akan',
          'Albanian',
          'Amharic',
          'Arabic',
          'Aragonese',
          'Armenian',
          'Assamese',
          'Avaric',
          'Avestan',
          'Aymara',
          'Azerbaijani',
        ]}
        value={language}
        onChange={value => {
          console.log(value);
          setLanguage(value);
        }}
        title="Select Language"
      />
    </CenterWrapper>
  );
};
