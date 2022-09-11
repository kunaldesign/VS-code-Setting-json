# CHANGELOG

# 5.7.1 2022-8-18

- Support collapse tree view.
- Better interactive experience for column editing.
- Add the table name to the name of the export file.
- Fixed distinct query get count fail.
- Fixed es data cannot be edited when it is empty.
- Fixed the exported mysql excel cannot perform formula calculation.

# 5.7.0 2022-8-13

- Better performance of tree node connections.
- Modify connection ordering only when dragging connection nodes.
- Fix:
  - Fixed ssh connection no refresh button.
  - Fixed the wrong endpoint of aws s3 service.
  - Fixed the checkbox cannot be displayed under the light theme.
  - Fixed the dialog not working after shrinking the screen on result view.

# 5.6.10 2022-8-11

- Support offline activation of premium.
- Better support for elastic search completion.
- Support to display column comment by hover.
- Fixed unable to delete item from redis set.
- Fixed cells become empty after pasting on result view.
- S3:
  - Fixed public url not encoded.
  - Fix created object with spaces at the end.

# 5.6.8 2022-8-8

- Support for copying public urls of s3 files.
- Don't trigger refresh when the switch file is bind to the same connection.
- ElasticSearch:
  - Display results using horizon view.
  - Add cost time display when displaying json results.
  - Fixed can't parse when body has blank lines.
  - Fixed not detecting pagination status correctly.
  - Fix the data cannot be saved when the field is object.
  - Fixed the incorrect total displayed when es data exceeds 10,000.

# 5.6.5 2022-7-24

- Add native ssh connection.

# 5.6.3 2022-7-20

- Support show ssh server status.
- Remember the last selected path.
- Support connect to docker by ssh connection.
- Support more key exchange algorithms for ssh server.
- Fixed es query cannot be highlighted on result view.

# 5.6.1 2022-7-15

- Added timeout detection when creating connection.
- Docker:
  - Fixed connect to docker by ssl fail.
  - Support conenct to docker over unix socket and ssl.
  - Add menu to run docker image in background.

# 5.6.0 2022-7-14

- Better active connection selector.
- Support connect to docker service.
- Support setting mysql connection to safe mode.

# 5.5.5 2022-7-7

- Support change group name.
- Support connect to active mode ftp server.
- Better operaion support for ftp, sftp and s3 service.

# 5.5.4 2022-7-5

- Support connect to S3 service.
- Better support for elastic search.
- Support filter tables by input box.
- Fix:
  - Fixed Hover table will display ddl.
  - Fixed ssh server showing version repeatedly.
  - Fixed the view not updating after modifying the file.

# 5.5.3 2022-7-2

- Support cancel import and dump data.
- Support for save connections without connected.
- Support show mongodb, elasticsearch object count.
- Fix:
  - Fixed dump structure still dupming data.
  - Fixed the ssh terminal not entering the path.
  - Fixed failure to parse redis command results.
  - Fixed postgresql unable to import/dump data with non-public schema.

# 5.5.2 2022-6-29

- Implement SQL notebook.
- Remember the chosen export path and import path.
- Fix:
  - Fixed sftp directory showing server name.
  - Fixed the selected ssh key cannot be displayed in some cases.

# 5.5.1 2022-6-29

- Upgrade sql formatter version.
- Fix:
  - Fixed show 达梦 view DDL fail.
  - Fixed unable to show oracle view DDL.
  - Fixed sqlite not parsing backslash correctly.]\
  - Fixed unable to edit SSH connections created by older versions.

# 5.5.0 2022-6-28

- Query file to add connection status.
- Show connection status in query file.
- Support choose ftp encoding on connect view.
- Do not toggle editor layout when has active query page.
- Fix:
  - Fixed some query files do not generate bind connection comment.
  - Fixed unparseable \\" strings

# 5.4.8 2022-6-24

- Remove like from clickhouse dialect.
- Support bind connection in SQL files.
- Support gbk encoded ftp connection.
- Support run sql without actived the tree panel.
- Supports dumping mysql and postgresql tables through multiple selections.
- ElasticSearch
  - Ignore comments in request body when running query.
  - Provide completion for search API.
- Fix:
  - Fixed ftp wrong folder icon.
  - Fixed detection SQL block failure when string in SQL has quotes.

# 5.4.6 2022-6-21

- Supports send elasticsearch query with any request body.
- Fix can't automatically switch active connections.

# 5.4.5 2022-6-20

- Do not restore expand state of connection after start vscode by default.
- Support to restore sql active state after vscode restart.
- Support for opening an inactive connection terminal through ssh tunnel.
- Fix:
  - Fixed connection stuck after executing failed SQL.
  - Fixed unable to display the cost time of running failed SQL.
  - Fixed create ssh connection can't automatically select private key.

# 5.4.4 2022-6-19

- Support for parsing SQL with backslash.
- Support paths with special characters when export/import mysql sql.
- Fixed unable to display sftp hidden files.

# 5.4.2 2022-6-16

- Add more mysql data type highlight.
- Use better names for ssh tunneled connections.
- Support connect to ssh server by ssh tunnel.
- MongoDB:

  - Fixed can't use filter.
  - Support show columns and index of collection.
- ElasticSearch:

  - Don't reload data after update date.
  - Fixed can't use filter.
- 达梦:

  - Fixed the result cannot be rendered when the data has bigInt or text stream.
  - Fixed cannot show view,procedure, function ddl.
  - Support show package.
- Fix:

  - Fixed console interface being cluttered on small resolutions.
  - Fixed the data cannot be updated after the filter is turned on.
  - Fixed wrong insert SQL being generated by copy row.
  - Fixed unable to dump data using built-in dump.

# 5.4.1 2022-6-13

- Support dump/restore redis data by ndjson.
- SSH:
  - Show ssh server system name after active.
  - Support connect to ssh server by private key and password.
- Treeview:
  - Update folder icon.
  - Support change group node sorting by drag.

# 5.4.0 2022-6-8

- Support connect to custom jdbc server.
- Tree View:

  - Fixed cannot change nosql connection sort by drag.
  - Automatically collapse invalid connections.
  - Fetch server version after connection active.
- Result view:

  - Update selected SQL background color on result view.
  - Support for modifying table data with unicode names.
  - Fix the failure to terminate running SQL in some cases.
- SSH:

  - Block ctrl+pageHome and ctrl+pageDown in the ssh terminal.
  - Using terminal.integrated.fontFamily as terminal font family.
- Redis:

  - Fix loading key fails when the number of clusters is odd.
  - Cache keys to improve performance.
  - Support connect to cluster by ssh tunnel.
- Oracle:

  - Support show table rows count.
  - Support show table comment.
  - Better support pl/sql detect.
- MongoDb:

  - Sort collection in tree view
  - Show date type as better format.
  - Support for displaying dynamic documents.
  - Support show column type.

# 5.3.9 2022-6-4

- Upgrade sqlite3 for windows version.
- Support read sqlite3 resource file .sqliterc.

# 5.3.8 2022-6-2

- Tree view:
  - Support show node childs count.
  - Add trigger group to table node.
  - Reload after reset options.
  - Support drop oracle package.
- Support change column notNull, auto_increment directly on deisgn table.
- Kill connection after connect timeout.
- Support show pg_catalog tables ddl without prefix.
- Fixex:
  - Fixed no reload columns after add column on design table.
  - Fixed paging failure after data exceeds the limit.

# 5.3.7 2022-5-29

- Support show oracle package source.
- Sort stored procedures, functions for all types of databases.
- Improve the security of configuration synchronization.
- Fixed delete row no quote primary key value.

# 5.3.6 2022-5-28

- Support show approximate count for table of postgresql.
- Save execute state even change active editor.
- Result view:
  - Limit input length on edit dialog.
  - Better cost time format and real-time display.
  - Support delete row with multiple primary key.
  - Support disable fetch columns when open table.
  - Fixed update not working after modify primary key value.
  - Fixed cannot delete after select all.

# 5.3.5 2022-5-26

- Fixed dialog not closing properly after save.

# 5.3.4 2022-5-26

- Support open oracle terminal by sqlplus.
- Result view:
  - Add option to escaped all object name.
  - Fix load columns fail when change active connection.
  - Supports edit row without primary keys by opening the edit dialog.
  - Do not refresh data after modifying data.
- Fix:
  - Fixed count was called at the wrong time for neo4j.

# 5.3.2 2022-5-23

- Support copy connection.
- Result:
  - Live preview for insert/edit data.
  - Record execute SQL history(By ctrl+up/download).
  - Add open new panel to NoSQL connection.
  - Pin/unpin result view after click unlock/lock.

# 5.3.1 2022-5-21

- Record history per connection, database and schema.
- Support show DDL cross schema or database.
- Result view:
  - Limit the maximum number of results page loads to 1000.
  - Better sort interaction on result view.
  - Set reasonable editor focus when displaying SQL results.
- Oracle:
  - Support complection cross schema.
  - Fixed change active connection to oracle fail.
  - Fixed cannel executing sql fail.
- Redis:
  - Support dump redis folder.
  - Speed up page open.
  - Add menu of dump data to redis connection.
  - Fixed opening terminal affecting tree view.
  - Fixed the highlight disappearing when switching different types of keys.
  - Fixed ttl seconds being set to milliseconds when restoring dump files.

# 5.3.0 2022-5-18

- Better support for **neo4j**.
- Speed up the loading of large data for **redis**.
- Support **case insensitivity** to provided completions.
- Optimize the **performance** for ftp view operations.
- Fix:
  - Fixed sql server cannot load system table columns.
  - Fixed generate document failed for postgreSQL.
  - Fix the error message cannot be displayed after hiding the toolbar.

# 5.2.9 2022-5-15

- Support sync file to ftp server.
- Tree UI:

  - Optimize some UI experience.
  - Supports configuring timeout for all connection.
  - Fixed incorrect connection configuration causing the view to freeze.
  - postgresql supports viewing the source code of overloaded functions and procedures.

# 5.2.8 2022-5-13

- Support change connection sorting by drag.
- Parse postgreSQL float as string.
- Oracle:
  - Support batch execute SQL.
  - Support connect by custom jdbc url.
  - Fixed not being able to switch to lowercase schema.
- Neo4j:
  - Support view all relations.
  - Better support for pagination.
  - Support query node event label with keyword.
  - Add inline icon to create query file for nodes and relationships.

# 5.2.7 2022-5-11

- Result View:
  - Hide filter switch.
  - Fix show empty string fail.
  - Support select multiple rows by press shift key and check box.
- Support batch upload and download sftp files.
- Show table ddl supports showing foreign keys of postgresql.

# 5.2.5 2022-5-10

- Support show foreign keys for postgresql, oracle, sqlite.
- Support import external data to elasticsearch and mongodb.
- Better table DDL generator.
- Result View:
  - Clear result view after exectue other sql.
  - Show magnifying glass only on multiple lines of text.
  - Add save button to save data modify.
  - Correctly display post-operation SQL.
  - Support pagination for oracle and sql server.
- Fix:
  - Fixed cannot save by command+s.
  - Fixed select showed dbs cannot be cancel.
  - Fixed loss of editing effects after view scrolling
  - Fixed executing paginated SQL not paging correctly.
  - Fixed show sqlite null column fail.
  - Fixed duplicate actions performed when the view is first created.
  - Fixed mongodb update fail on edit dialog.
  - Fixed elasticsearch delete data fail.

# 5.2.4 2022-4-29

- Enhance SQL Formatter.
- Show non-nullable column in red.
- Exporting excel will come with query sql.
- Fix show data count fail if sql contain line separator.

# 5.2.2 2022-4-27

- new:
  - Support parse sql parameter.
  - Support selecting the schema to display.
  - Support connect to clickhouse by https protocol.
- enhance:
  - Provides better completion based on database type.
  - SQL Codelen support parse function and procedure.
  - Support complection when editing procedure, function and view statement.
- fix:
  - Fixed running status not updating after editing SQL.
  - fix database cannot be drop for postgresql.
  - Fix mysql8 display index failure.
  - Fix panel not focus after create connection.

# 5.2.1 2022-4-25

- new:
  - Support connect to redshift.
  - Support show table index on tree view.
- enhance:
  - Better mysql icon.
  - Better support for oracle.
  - Support complection of hidden object.
  - Better SQL highlighting in the result view.
- Fixed the high version of mysql to import SQL failed.

# 5.2.0 2022-4-21

- Support connect to oracle.
- Improve table loading performance.

# 5.1.7 2022-4-19

- new:
  - Support change connection group by drag.
  - Support for selecting databases to display.
  - Support don't save password for premium user.
  - Support import xlsx, csv, json, xlsx for premium user.
- update:
  - Support config the number of keys loaded by Redis scan.
- Fix:
  - Fix loading database infinite times.
  - Fix can't complection cross schema.
  - Fixed unable to drop tables with keywords.
  - Fixed not being able to modify table data when database panel is not active.

# 5.1.6 2022-4-12

- new:
  - Add configuration for new panel button display, default is false.
  - Add new column button next to table and column node.
  - Support edit set and zet value for redis.
- Fix:
  - Fix change active db fail.
  - Fix loss auto_increment,charset after update for mysql.
  - Fix show payment instructions when hover sql.
  - Fix mssql non-default schema mock data failure.
  - Fix 达梦 can't change schema.

# 5.1.0 2022-4-10

- new:
  - Show execute status on editor panel.
  - Support show table ddl by "go to definition", premium only.
- Keep showed database as database on connect view.
- fix:
  - Fix the failure of parsing sqlite and postgresql to execute multiple sql.
  - Fix the failure of mariadb backup and open terminal.
- Result view:
  - Support hide SQL panel and toolbar, premium only.
  - Fix complection for table fail.

# 5.0.8 2022-4-4

- Auto format json value for redis string.
- Compatible with dark theme for redis string.

# 5.0.7 2022-4-3

- Better inner document.
- Remote developement:
  - Fix github login on remote fail.
  - Fix open document fail.
  - Fix server icon gone on connect view.

# 5.0.6 2022-4-2

- Do not open terminal in editor group when file is autosaved
- Supports code completion with commas.
- Clear old data when create table template.

# 5.0.4 2022-4-1

- new:

  - Support show table and column comment on complection.
  - Redesign redis intergrate terminal.
  - Add welcome button
- update:

  - Update connection container icon.
  - Update table complete icon on complection.
  - Support change on detail dialog.
  - Better support for jsonb type of postgres.
  - Migrate terminal to editor group.
  - Update intergrate document.
- Fix:

  - Fix save configuration fail after clearing the configuration.
  - Fix conflict sftp same name with diffrent server.

# 5.0.2 2022-3-30

- Support complection on result view.
- update:
  - Reject modify SQL for read-only connection.
  - Better design for connect view.
- fix:
  - Fix column meta gone after change position.
- option:
  - Open basic options for free.
  - Don't save connection collpaseState option.
  - Don't execute sql of current cursor option.
- SFTP
  - Support show not hidden file for free.
  - Support remove not empty folder.
  - Support synchronous modification of the same file name

# 5.0.0 2022-3-27

- Better design for connect, result, design, redis and console view.
- New:
  - Highlight active SQL and preview SQL.
  - Add validator for insert dialog.
  - Bind shortcut for mac cmd key.
  - Support dump and restore redis.
- Update
  - Update document theme to dark.
  - Add keyword completion for alter sql.
  - Not switch editor layouts when there are multiple editors.
  - Order procedure and function for mysql.
- Redis:
  - Support view stream data
  - Fix redis ttl lose when update.
  - Redis terminal support get error message.
  - Reload nosql panel after delete redis key on redis view.
  - Fix legacy bugs.
- SSH:
  - Fix duplicated paste when using ssh terminal on mac os.
  - Fix forward port fail.

# 4.8.7 2022-3-24

- Support batch delete table.
- Support onfigure which keys trigger completion.
- Fixed can't insert data when table has no primary key.
- Better SQL template.
- Keep previous content when generate SQL template.
- Support show neo4j  all nodes.
- Better support for clickhouse
  - Support show table primaryKey, comment.
  - Support mock data.

# 4.8.6 2022-3-19

- new:
  - Focus panel when connect to server.
  - Setting connection sorting rule.
  - Connect to graph database neo4j.
- change:
  - Update full result view icon.
  - Improve redis performance.
  - Remove editing focus when scroll result view.
  - Support clickhouse and 达梦 open terminal
- Fix
  - Connection no close when update connection info.
  - Check free account limit incorretly.
  - Fix SQL Server column can not display results when column is empty.
  - FTP Server icon not show.

# 4.8.5 2022-3-17

- Update toolbar icons.
- Fix order by column fail.
- Sort es indexs.

# 4.8.3 2022-3-15

- Fix login by github oauth fail.
- New:
  - Support grouping connection(对连接进行分组).
  - Speed up data loading.
  - Support setting connection is read only.
  - Auto read private key when using ssh.
  - Support using code action to show table source or view table data.
  - Support kill running execute.
- Update:
  - Edit connect always open new view.
  - Filter menu add is null condition.
  - Update connection document, and add change log to nav bar.
- Fix:
  - Data is not displayed correctly when a query has duplicate column names(当查询有重复列名显示不正确的问题).
  - Sqlite and sql server completion fail.
  - Columns containing keywords are not quoted when exporting sql.

# 4.8.0 2022-3-12

- New:
  - Support connect to "达梦" database.
  - Add refresh columns cache button of table node.
- Update:
  - Support using command+s to save new row.
  - Save result view filter state.
  - Always open new connect view when click connect button, and update icon when connect success.
  - Better filter context menu on result view.
  - Rollback ssh terminal icon.
  - Update some document.
  - 提高中国用户访问速度

# 4.7.8 2022-3-10

- Fix ssh terminal triggering copy without text selection.
- Support detect elasticsearch connection state.

# 4.7.7 2022-3-9

- new:
  - Premium user support cloud config sync.
  - Add usage documents.
- update:
  - Better ssh terminal view.
- fix:
  - Sometime ssh tunnel can not be reconnected after disconnection.
  - Edit connection lose private key path.
- limit:
  - free account not allow using workspace connection and close connection.

# 4.7.5 2022-3-5

- new:

  - Login by github oauth.
  - Change option, export and import config on console view.
  - Connection configuration support completion.
- Fix create workspace connection fail on remote ssh.
- Fix show postgresql jsonb fail.

# 4.7.4 2022-3-3

- Better toolbar design on result view.
- Better design for connect view.
- Fix record sql history fail.

# 4.7.3 2022-3-1

- Better design for result view.
- Support completion on postgresql database query file.
- Fix open postgresql terminal fail.

# 4.7.0 2022-2-26

- Access to the paid system, now the free use connection and some function(export, ftp) will be limited.
- new:

  - Support connect to ftp server.
  - Better design for message notice.
  - Support insert data by dialog.
- Enhance:

  - Detection of columns containing keywords.
  - Get result lock state when open result view.
  - Mock data config support remove unnecessary columns.
- fix:

  - Design table not chekc keyword and not refresh column cahce.
  - Old version connection refresh not work.
  - Create ssh tunnel fail when has multiple ssh tunnel.
  - SFTP copy path fail.
  - Count sql did not remove group by clause.
  - Result view filter multi column fail.

# 4.6.0 2022-2-16

- Better complection for columns.
- Support lock and unlock result view.
- Fix sql message not hidden corretly.
- Support connect to clickhouse by connection url.
- Fix mongo delete db fail.
- Add more keyword detect for auto wrapper quote.

# 4.5.7 2022-2-6

- Support connect to redis with username.
- Auto scroll redis terminal.
- Copy ssh host if using ssh.
- Fix open es query not active connection [#450](https://github.com/cweijan/vscode-database-client/issues/450).
- Better query file for table.

# 4.5.2 2022-1-21

- Add more error tolerance when connecting.
- Support show redis server version.
- Redis string key view support responsive.
- Fix join result causing the editor to disappear.
- Support special sftp root path.
- Remove ftp support.
- Hide ssh passphrase.
- SSH terminal add padding.
- Fix sqlite show name error.
- Fix sqlite complection fail.
- Other bugs fix.

# 4.5.0 2022-1-7

- Support connect to clickhouse.
- Show results in vertical direction.
- Using new empty row instead of dialog for insert data.
- Fix join result view and editor fail.
- Fix complection fail when has as keyword.

# 4.4.0 2021-12-30

- Update extension logo.
- Do not set the default statement timeout.

# 4.3.6 2021-12-25

- Update connect and result view some style.
- Redis show key count.
- Refresh column cache when click table.
- Import sql support multiple files.
- Sort mysql database name by alphabet.
- Change mysql column position add confirm.

# 4.3.5 2021-12-11

- Support delete multi redis key.
- Fix mysqldump8 dump mysql5.7 server fail.
- Fix complection fail when hidden procedure group.

# 4.3.1 2021-12-1

- Reduce mysql table info description.
- Reduce ssh connection description.
- Fix parse jsonb error [#381](https://github.com/cweijan/vscode-database-client/issues/381).
- Fix redis change page size not work.

# 4.3.0 2021-11-29

- Improve tree view render performance.
- Update active connection icon.
- Support show redis database.
- Better result view design.
- Fix table columns complection fail.
- Fix not show call procedure result.
- Fix using ssh private key open terminal fail.
- Fix redis cluster load key fail.

# 4.2.3 2021-11-24

- Upgrade ssh2 version, now support more ssh private key format.
- Support connect postgresql and mysql by connectionUrl.
- Show postgresql and mysql version on panel.
- Fix result view not work on remote development.
- Fix postgresql not reload data when execute DML.

# 4.2.1 2021-11-22

- Using pg_dump to dump postgreSQL.
- Fix es load index fail.
- Fix socket path gone [#364](https://github.com/cweijan/vscode-database-client/issues/364).
- Always open new ssh terminal and enhance key event dispath.
- Supports running in offline environment.
- Fix filter operation error.

# 4.2.0 2021-11-15

- Remove export file default path.

# 4.1.9 2021-11-11

- Using scan command instead keys for redis.
- Result and ssh terminal view font style follow vscode setting.
- Result view add sql preview feature.
- Better support for singe quote [#341](https://github.com/cweijan/vscode-database-client/issues/341).

# 4.1.8 2021-10-29

- Better support for sqlite.
- Paste as plain text when edit on result view.
- Change filter operation from = to like.
- Support change default value for mysql [#317](https://github.com/cweijan/vscode-database-client/issues/317).
- Change default dump url is workspace [#293](https://github.com/cweijan/vscode-database-client/issues/293).
- Add more chinese support on web view.

# 4.1.7 2021-10-8

- Ignore ElasticSearch ssl certificate check.
- Fix show error column type on result view.
- Support config ssh connect timeout.
- Update result view filter color.
- Ftp node add refresh button.

# 4.1.6 2021-9-18

- Improve security, config.json will auto delete when close.
- Update some buttion border and icon.
- Add shortcut to run ElasticSearch query.
- Fix run postgresql explain sql fail.
- Fix show duplicate column nodes when have more constraint.
- Fix generate postgresql mock data fail.

# 4.1.5 2021-9-12

- Add pagination to view redis value with big data.
- Improve sql complection.
- Mongodb support sort by column.
- Change default export path as workspace.

# 4.1.3 2021-9-6

- Reduce ram usage for webview cache.

# 4.1.2 2021-8-29

- Better redis view.

# 4.1.0 2021-8-15

- Support connect to redis cluster, [#242](https://github.com/cweijan/vscode-database-client/issues/242).
- Better result view .
- Export csv with header, [#273](https://github.com/cweijan/vscode-database-client/issues/273).
- Fix result view loading state gone.
- Fix codelen check delimiter fail.
- Fix mysql8 cannot show index.

# 4.0.5 2021-8-13

- Struct sync remove disable connection.
- Fix auto complete fail on SQL file.
- Support close ssh connection.
- Fix result view border not fit for theme.`activeDocument`
- Fix untitle document cannot split.

# 4.0.0 2021-8-7

- Support multiple result view.
- Fix result view show vertical scrollbar.
- Fix conflict with other extension.
- Fix connect and result view legacy bugs.
- Remove native ssh from connect view.

# 3.9.9 2021-8-2

- Fix hover query table action not work.

# 3.9.8 2021-7-27

- Support special ssl ca certificate.
- Hover info add action to query table data.
- Fix complection bug.
- ElasticSearch support connect with token or account.
- Support connect by native ssh command.
- Fix open struct sync fail.

# 3.9.6 2021-7-22

- Add hover to run selected sql.
- Add sql template action icon to table node.

# 3.9.5 2021-7-19

- Using mysqldump to dump database.
- Fix connect to elasticsearch using ssh tunnel fail.
- Better postgresql support.

# 3.9.3 2021-7-2

- Better sql complection.
- Fix multi line space ignored.

# 3.9.2 2021-6-24

- Enhance sql detect.
- Update run query shortcut.
- Keep query file content.
- Create SQL document outline.

# 3.9.0 2021-6-22

- Support edit connection config.
- Isolate the configuration of vscode and ssh-remote.
- Support load data when load timeout.
- Support install sqlite3 from connect page.
- Better change active database item.
- Fix vscode shortcut not working on ssh terminal.
- Fix mongo export data fail.
- Update some ui.

# 3.8.9 2021-6-16

- Add shortcut of run sql on result view(ctrl+enter).
- Support generate database document.
- Fix bugs.

# 3.8.8 2021-6-11

- Fix date incorrect of sqlserver [#199](https://github.com/cweijan/vscode-database-client/issues/199).
- Prefre using connection name [#215](https://github.com/cweijan/vscode-database-client/issues/215).
- Postgresql query with quote [#217](https://github.com/cweijan/vscode-database-client/issues/217).
- Fix export occur undefined [#218](https://github.com/cweijan/vscode-database-client/issues/218).

# 3.8.7 2021-6-8

- Update toolbar style.
- Fix trigger template error.
- Support using sqlite3 from path.

# 3.8.6 2021-6-3

- Support connect redis with ssl.
- Fix parse empty string or zero as null on result.

# 3.8.3 2021-5-18

- Support connect to MongoDB.
- Fix postgresql duplicate tables.

# 3.8.2 2021-5-15

- Connection keep origin position when edit.
- Support export SQLite data and struct.
- Fix possible connection delete bug.

# 3.8.0 2021-5-14

- Support sqlite.
- SSH support download folder.

# 3.7.6 2021-5-12

- Update ui operation icon.
- Set ssh terminal as full height.
- Support open mysql and postgresql terminal.
- Fix some legacy bugs.

# 3.7.4 2021-5-11

- Support config ssl connection.
- Update ui operation icon.
- Better sql server support.
- Fix sqlserver cannot edit.
- Fix sqlserver show object source fail.

# 3.7.3 2021-5-9

- Compatible icon with version 1.56.0 of vscode.
- Fix include database not work.

# 3.7.2 2021-5-8

- Add cost time to result view.
- Fix ssh connnection private key not persist.
- Result show column type.

# 3.7.0 2021-5-7

- Fix struct sync open fail.
- Mssql add  windows auth option.
- Fix first data load fail.
- Trigger refresh when create object.
- Add run all sql comand.
- Format postgresql timestamp show like pgadmin4.

# 3.6.9 2021-4-28

- Support show multi DML execute result.
- Result view select column without '*'.
- Disable retry.
- Fix filter trigger save on result view.
- Update donate button style.

# 3.6.7 2021-4-2

- Postgresql support config ssl enable option.
- Support delimiter on codelen.
- Change ElasticSearch connect host:port to url.

# 3.6.5 2021-3-29

- Support connect to ftp server.
- Support delete ssh connection.
- Support show procedure one result.
- Fix bugs.

# 3.6.0 2021-3-11

- Support connect to database server without exists connection.
- Support connect to ssh server.
- Implment some ui feature of postgresql.

# 3.5.6 2021-3-7

- Redis Support add、delete of list、set、hash

# 3.5.5 2021-3-5

- Redis terminal support show some command.

# 3.5.3 2021-2-24

- SqlServer support change connection port.
- Fix postgresql import sql fail.
- Sort table by name.

# 3.5.2 2021-2-5

- Fix treeview not refresh when drop node.
- Result view update and get better update interactive.

# 3.5.0 2021-2-3

- Result View :
  - Adapt scroll bar when height change.
  - Move full button position.
  - Split only when run from editor
  - Fix elasticSearch query error message not showed
- Tree Ui :
  - Support hide userNode, viewNode.
  - Add some node info as tooltip.
  - Reduce connection name.
  - Support remember workspace connection status.
- Support sql intellisense cross schema.
- Update server status view.
- Support show postgresql, sqlserver schemas.

# 3.4.4 2021-1-29

- Support schema with postgresql、sqlserver.
- Design table view update.
- Add ui config
- Support config  connection timeout.

# 3.4.3 2021-1-28

- Fix new table panel cannot execute sql.
- Speed up data dump and support sqlserver、postgresql.
- Support disable sql code lens.
- Support connect to mssql with encrypt disabled.

# 3.3.4 2021-1-27

- Fix 3.3.1 add connection fail.
- Trim legacy code, better peformance right now.
- Add full result view icon.

# 3.3.1 2021-1-26

- More implement or table design.

# 3.3.0 2021-1-26

- Support close connection.
- Add snippet to sql editor.
- compatible with old vscode version.
- Fix code len detect comment as sql.
- Add context menu to result view.
- Add more chinese content.
- Init design table.

# 3.2.2 2021/1/25

- Fix redis folder Infinite recursion load bug.
- Add GUI of index manager view.
- Implement database struct sync feature.
- Enhance intetllisense sql.

# 3.2.1 2021/1/23

- Resign connect page.
- Add sql code lens.

# 3.2.0 2020/1/20

- Migrate elasticsearch node to nosql explorer.
- Support connect to redis server.

# 3.1.0 2021/1/17

- Support connect to elasticsearch.

# 3.0.0 2021/1/13

- Support connect to postgresql and sqlserver.
- Reduce resource consumption.
- Fix cannot edit json column data.

# 2.9.2 2021/1/4

- Better result view border color.
- Remember page size.
- Fix sql formatter could not be detect comment correctly.
- Add i18n of chinese.

# 2.9.0 2020/12/31

- Better update operation interactive.
- Support auto show total.
- Show column require hint.

# 2.8.9 2020/12/29

- Support export as csv、json.
- Enhance result UX.

# 2.8.8 2020/12/28

- Resign result page.

## 2.8.7 2020/12/22

- Resign connect page @donnisnoni.
- Reduce resource consumption when node change.
- Support save query as query node.

## 2.8.5 2020/12/6

- Add more feature to view node.
- Support change column position.

## 2.8 - 2020/11/29

- Support change active database from status bar.
- Support export view, procedure, function.
- Fix multi query page database change.
- Change mysql client to mysql2, now support mysql8.

## 2.7.5 - 2020/11/19

- Migrate status to status bar.

## 2.7.0 -2020/11/9

- Resule view theme follow vscode theme.

## 2.6.0 - 2020/10/20

- Support config connection per workspace.
- Hide error messages.

## 2.5.7 - 2020/9/21

- Refacotr export panel.

## 2.5.5 - 2020/9/6

- Change update as edit in same view.

## 2.5.0 - 2020/8/17

- Improvement query result render performance.

## 2.4.8 - 2020/8/14

- Fix new panel bug.

## 2.4.7 - 2020/8/13

- Fix overview render bug.

## 2.4.6 - 2020/8/11

- Add more keyword.

## 2.4.5 - 2020/8/10

- Support big number type.

## 2.4.3 - 2020/8/7

- Add database overview.
- Add diagram design.

## 2.4.2 - 2020/8/5

- Fix limit generator error.
- Adjust result page height.

## 2.4.0 - 2020/8/3

- Enhance dump performance.
- Refactor data import.

## 2.3.12 - 2020/8/3

- Auto add limit for select statement.

## 2.3.11 - 2020/8/2

- Hight light active connection.
- Show more info when open edit panel.
- Add column type tooltip in result panel.
- Fix copy fail.

## 2.3.7 - 2020/7/20

- Support config default limit of query.

## 2.3.6 - 2020/7/15

- Support edit date in result view.

## 2.3.5 - 2020/7/14

- Not record repeat history.
- Support query in new panel.
- Add count query to content menu of table node.
- Add truncate database to content menu of database node.

## 2.3.0 - 2020/7/10

- Update result view.

## 2.3.0 - 2020/7/8

- Add dark theme.

## 2.2.8 - 2020/7/7

- Add count button in view.

## 2.2.4~2.2.7

- Fix bugs and adjust result view.

## 2.2.3 - 2020/6/24

- Add copy host feature.
- Support add name prefix to connection.

## 2.2.0 - 2020/6/13

- Reduce package size.
- Support export data as xlsx.

## 2.1.4 - 2020/5/20

- Fix connect database by ssh tunnel fail.

## 2.1.0 - 2020/5/14

- Update Query Result Page

## 2.0.1 (2020/5/6)

- Highlight active database.
- Enhance dashboard.
- Support open table in new panel.

## 1.9.6 (2020/5/1)

- Fix bugs.

## 1.9.0 - 2020/4/28

- Support SSH tunel.
- Show comment of column、table on tree view.
- Suport export table struct.

## 1.8.1 - 2020/4/23

- Connect can specify database.
- Add mock data feature.
- Update mysql connect client to newest version.
- Fix inteliij bugs.

## 1.8.0 - 2020/4/22

- Show template sql in same file.
- Get connection correctly when connection multi server.
- Improve UI Interactive.
- Rollback when batch execute sql occur error.
- Fix bugs.

## 1.7.32 - 2020/4/18

- Fix legacy bug: connect to same host fail.

## 1.7.31 - 2020/4/17

- Switch active database using open query.
- support insert or update in any query result page.
- intellij insert|update code.
- show comment when edit.
- fix bugs.

## 1.7.2 - 2020/4/15

- Support copy database、table、column name
- Support show error message when importing data occur error.
- Remeber sql history for database
- Ui improve

## 1.7.1 - 2020/4/11

- Support sort、filter in result page.
- Enhance sql intelliCode.

## 1.7.0 - 2020/4/10

- Support Insert,Update,Delete in reuslt page.
- Refactoring event message.

## 1.6.37- 2020/3/20

- Table name inference
- Sql formatter
- Record History
- Import sql file
- Hover table to get info

## 1.6.36 - 2020/3/19

- Fix many mysql connection error.

## 1.6.35 - 2020/3/18

- get sql divisiton with semicolon on editor
- fix mysql 8.0 get function|procedure info fail.

## 1.6.2 (2020/3/9)

- Beautify query result page.

## 1.6.0 (2020/3/8)

- Fix refresh not update treeview
- Support operate user、trigger、view、procedure、function

## 1.5.4 (2020/3/7)

- Fix change database fail
- Query result page beautify
- Sql assistant enhance

## 1.5.3 - 2020/2/22

- Focus query result panel when query

## 1.4.5 - 2019/4/30

- Add database meta cache.

## 1.4.0 - 2019/3/18

- Officially refactored project by @cweijan.
- Add sql intelligent prompt, SQL statement template, click on the data table to query directly.

## 0.3.0 (2018-03-12)

* Show query result as HTML table

## 0.2.3 (2018-02-23)

* Add support for executing selected query

## 0.2.2 (2017-12-31)

* [#10](https://github.com/formulahendry/vscode-mysql/issues/10): Add key bindings for 'Run MySQL Query'

## 0.2.1 (2017-12-05)

* Keep original properties when creating connection
* Close the connection after query

## 0.2.0 (2017-12-04)

* Support SSL connection

## 0.1.1 (2017-12-03)

* List columns

## 0.1.0 (2017-11-30)

* Support multiple statement queries

## 0.0.3 (2017-11-26)

* Activate extension when running MySQL query

## 0.0.2 (2017-11-24)

* Better output format: display output as table
* [#2](https://github.com/formulahendry/vscode-mysql/issues/2): Add option to set maximum table count, and increase the dafault count

## 0.0.1 (2017-11-22)

* Initial Release
