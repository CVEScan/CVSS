docEditor.on('ready', async () => {
    defaultTabs.sourceTab.getValue = function () {
        var res = JSON.parse(sourceEditor.getSession().getValue());
        res = cveFixForCVSS(res);
        return res;
    };
});
