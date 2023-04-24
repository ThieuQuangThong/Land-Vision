﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Land_Vision.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateAddHideCollummUserPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isHide",
                table: "Users",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isHide",
                table: "Users");
        }
    }
}
