import { expect } from 'chai'
import getText, { setTranslation } from './index'
import dictionary, { DictionaryInterface } from './dictionary';
import localeDefault from './locales/default'


describe('getText testing', function () {
    before(() => {
        setTranslation(<DictionaryInterface>localeDefault)
    })

    it('gettext with config without locale', () => {
        const txt = getText(dictionary.TRANSFER_RESPONSE, {
            sender: 'sender',
            receiver: 'receiver',
            comment: 'comment',
            value: 'somevalue'
        })
        expect(txt).eql('sender gave receiver somevalue comment')
    })
    it('gettext with config with existing locale', () => {
        const txt = getText(dictionary.TRANSFER_RESPONSE, {
            sender: 'sender',
            receiver: 'receiver',
            comment: 'comment',
            value: 'somevalue',
            locale: 'default'
        })
        expect(txt).eql('sender gave receiver somevalue comment')
    })
    it('gettext with config with nonexisitng locale', () => {
        const txt = getText(dictionary.TRANSFER_RESPONSE, {
            sender: 'sender',
            receiver: 'receiver',
            comment: 'comment',
            value: 'somevalue',
            locale: 'canadian'
        })
        expect(txt).eql('sender gave receiver somevalue comment')
    })
    it('gettext with empty config', () => {
        const txt = getText(dictionary.TRANSFER_RESPONSE, {})
        expect(txt).eql('%sender gave %receiver %value %comment')
    })
    it('gettext with wrong config', () => {
        const txt = getText(dictionary.TRANSFER_RESPONSE, {
            nonexisitng: 'somevalue'
        })
        expect(txt).eql('%sender gave %receiver %value %comment')
    })
})
