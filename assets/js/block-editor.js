// ( function( plugins, editPost, element, components, data, compose ) {
 
// 	const el = element.createElement;
 
// 	const { Fragment } = element;
// 	const { registerPlugin } = plugins;
// 	const { PluginSidebar, PluginSidebarMoreMenuItem, PluginDocumentSettingPanel } = editPost;
// 	const { PanelBody, TextControl, Dropdown } = components;
// 	const { withSelect, withDispatch } = data;
 
 
// 	const MetaTextControl = compose.compose(
// 		withDispatch( function( dispatch, props ) {
// 			return {
// 				setMetaValue: function( metaValue ) {
// 					dispatch( 'core/editor' ).editPost(
// 						{ meta: { [ props.metaKey ]: metaValue } }
// 					);
// 				}
// 			};
// 		} ),
// 		withSelect( function( select, props ) {
// 			return {
// 				metaValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.metaKey ],
// 			};
// 		} ) )( function( props ) {
// 			return el( TextControl, {
// 				label: props.title,
// 				value: props.metaValue,
// 				onChange: function( content ) {
// 					props.setMetaValue( content );
// 				},
// 			});
// 		}
// 	);
 
// 	registerPlugin( 'sd-primary-categories', {
// 		render: function() {
// 			return el( Fragment, {},
// 				el( PluginSidebarMoreMenuItem,
// 					{
// 						target: 'sd-primary-categories',
// 						icon: null,
// 					},
// 					'Primary Category'
// 				),
// 				el( PluginDocumentSettingPanel,
// 					{
// 						name: 'sd-primary-categories',
// 						icon:  null,
// 						title: 'Primary Category',
// 					},
// 					el( PanelBody, {},
// 						el( MetaTextControl,
// 							{
// 								metaKey: '_sd_primary_cat',
// 								title : 'Category',
// 							}
// 						)
// 					)
// 				)
// 			);
// 		}
// 	} );
 
// } )(
// 	window.wp.plugins,
// 	window.wp.editPost,
// 	window.wp.element,
// 	window.wp.components,
// 	window.wp.data,
// 	window.wp.compose
// );


( function( wp ) {
	var registerPlugin = wp.plugins.registerPlugin;
	var PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel;
	var el = wp.element.createElement;
	var Text = wp.components.TextControl;
	var withSelect = wp.data.withSelect;
	var withDispatch = wp.data.withDispatch;
	var compose = wp.compose.compose;

	var MetaBlockField = compose(
		withDispatch( function( dispatch, props ) {
			return {
				setMetaFieldValue: function( value ) {
					dispatch( 'core/editor' ).editPost(
						{ meta: { [ props.fieldName ]: value } }
					);
				}
			}
		} ),
		withSelect( function( select, props ) {
			return {
				metaFieldValue: select( 'core/editor' )
					.getEditedPostAttribute( 'meta' )
					[ props.fieldName ],
			}
		} )
	)( function( props ) {
		return el( Text, {
			label: 'Primary Category',
			value: props.metaFieldValue,
			onChange: function( content ) {
				props.setMetaFieldValue( content );
			},
		} );
	} );

	registerPlugin( 'my-plugin-panel', {
		render: function() {
			return el( PluginDocumentSettingPanel,
				{
					name: 'my-plugin-panel',
					icon: 'admin-post',
					title: 'Primary Category',
				},
				el( 'div',
					{ className: 'plugin-panel-content' },
					el( MetaBlockField,
						{ fieldName: '_sd_primary_cat' }
					)
				)
			);
		}
	} );
} )( window.wp );