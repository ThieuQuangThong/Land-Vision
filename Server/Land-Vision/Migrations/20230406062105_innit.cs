using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Land_Vision.Migrations
{
    /// <inheritdoc />
    public partial class innit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Properties_propertyId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Properties");

            migrationBuilder.RenameColumn(
                name: "propertyId",
                table: "Posts",
                newName: "PropertyId");

            migrationBuilder.RenameColumn(
                name: "isVerified",
                table: "Posts",
                newName: "IsVerified");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_propertyId",
                table: "Posts",
                newName: "IX_Posts_PropertyId");

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "Users",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshTokenExpireTime",
                table: "Users",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "Posts",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "transactionType",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Properties_PropertyId",
                table: "Posts",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Properties_PropertyId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RefreshTokenExpireTime",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "transactionType",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "PropertyId",
                table: "Posts",
                newName: "propertyId");

            migrationBuilder.RenameColumn(
                name: "IsVerified",
                table: "Posts",
                newName: "isVerified");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_PropertyId",
                table: "Posts",
                newName: "IX_Posts_propertyId");

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Properties_propertyId",
                table: "Posts",
                column: "propertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
