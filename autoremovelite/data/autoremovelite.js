Ext.ns('Deluge.ux.preferences');

Deluge.ux.preferences.AutoRemoveLitePage = Ext.extend(Ext.Panel, {
    title: _('AutoRemoveLite'),
    header: false,
    layout: 'form',
    border: false,
    bodyStyle: 'padding: 10px',
    autoHeight: true,

    initComponent: function () {
        Deluge.ux.preferences.AutoRemoveLitePage.superclass.initComponent.call(this);

        this.add({
            xtype: 'label',
            text: _('Remove seeding torrents (with data) after:'),
            style: 'display:block; margin-bottom:8px; font-weight:bold;'
        });

        this.seedTime = this.add(
            new Ext.form.NumberField({
                fieldLabel: _('Seed time (hours)'),
                name: 'seed_time',
                value: 720,
                minValue: 1,
                maxValue: 8760,
                allowDecimals: false,
                width: 100
            })
        );

        this.on('show', this.onPreferencesShow, this);
    },

    onApply: function () {
        deluge.client.autoremovelite.set_config({
            seed_time: this.seedTime.getValue()
        });
    },

    onPreferencesShow: function () {
        deluge.client.autoremovelite.get_config({
            success: function (config) {
                this.seedTime.setValue(config['seed_time']);
            },
            scope: this
        });
    }
});

Deluge.plugins.AutoRemoveLitePlugin = Ext.extend(Deluge.Plugin, {
    name: 'AutoRemoveLite',

    static: {
        prefsPage: null,
    },

    onEnable: function () {
        if (!Deluge.plugins.AutoRemoveLitePlugin.prefsPage) {
            Deluge.plugins.AutoRemoveLitePlugin.prefsPage = deluge.preferences.addPage(
                new Deluge.ux.preferences.AutoRemoveLitePage()
            );
        }
    },

    onDisable: function () {
        deluge.preferences.removePage(Deluge.plugins.AutoRemoveLitePlugin.prefsPage);
        Deluge.plugins.AutoRemoveLitePlugin.prefsPage = null;
    }
});

Deluge.registerPlugin('AutoRemoveLite', Deluge.plugins.AutoRemoveLitePlugin);
