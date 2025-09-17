//mypreset.ts
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const CustomPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#3E97FF',
                    inverseColor: '#3E97FF',
                    hoverColor: '{blue.900}',
                    activeColor: '#3E97FF'
                },
                highlight: {
                    background: '#3E97FF',
                    focusBackground: '{blue.500}',
                    color: '#fff',
                    focusColor: '#b49a9aff'
                },

                item: {
            color: '{blue.700}',
            focus: {
              background: '{blue.50}',
              color: '{blue.700}',
            },}
            },
            dark: {
                primary: {
                    color: '{blue.50}',
                    inverseColor: '{blue.950}',
                    hoverColor: '{blue.100}',
                    activeColor: '{blue.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: '#3E97FF',
                    focusColor: '#3E97FF'
                }
            }
        }
    }
});

export default CustomPreset