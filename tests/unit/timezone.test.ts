describe('Timezones', () => {
    it('should always be GMT', () => {
        expect(new Date().getTimezoneOffset()).toBe(0);
    });
});
